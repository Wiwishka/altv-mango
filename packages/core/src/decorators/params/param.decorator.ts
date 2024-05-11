import { CoreMetadataKey } from '../../app/enums';
import type { Newable } from '../../types';
import type { MethodParameter } from '../../app/interfaces';
import { MethodParamType } from '../../app/enums';
import { isString } from '../../utils';
import { ErrorMessage } from '../../enums';
import type { Pipe } from '../../interfaces';
import { validatePipe } from '../../schemas';

export function Param(key: string, ...pipes: (Newable<Pipe> | Pipe)[]) {
    return <ParameterDecorator>((target: Object, method: string, index: number) => {
        if (!isString(key)) {
            throw new Error(ErrorMessage.ParamKeyMustBeString);
        }
        const validatedPipes: (Newable<Pipe> | Pipe)[] = [];
        for (const pipe of pipes) {
            const { valid, value, error } = validatePipe(pipe);
            if (!valid) throw new Error(error);
            validatedPipes.push(value);
        }

        const params = Reflect.getMetadata<MethodParameter[]>(CoreMetadataKey.ControllerParams, target, method) ?? [];

        if (params.some((param) => param.index === index)) {
            throw new Error(ErrorMessage.MultipleDecoratorsOnSingleParameterNotAllowed);
        }

        const paramTypes = Reflect.getMetadata<Newable[]>('design:paramtypes', target, method);
        const metatype = Array.isArray(paramTypes) ? paramTypes[index] : undefined;

        Reflect.defineMetadata<MethodParameter[]>(
            CoreMetadataKey.ControllerParams,
            [...params, { index, method, data: key, pipes: validatedPipes, type: MethodParamType.Param, metatype }],
            target,
            method,
        );
    });
}
