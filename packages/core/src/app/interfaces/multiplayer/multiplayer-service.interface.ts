
import type { EventEmmiter } from '../event';
import type { MultiplayerTimers } from './multiplayer-timers.interface';

export interface MultiplayerService {
    parseInternalArgs<U = unknown, T = unknown>(...args: any): {
        player?: U;
        body?: T;
    }
    log(arg: any, ...args: any[]): void;
    logError(arg: any, ...args: any[]): void;
    logWarning(arg: any, ...args: any[]): void;
    logDebug(arg: any, ...args: any[]): void;
    Timers: MultiplayerTimers;
    Events: EventEmmiter;
}
