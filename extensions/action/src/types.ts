import type {
    BaseState,
    Mutator,
} from '@harlem/core';

import Task, {
    TaskAbortCallback,
} from '@harlem/task';

export type ActionBody<TState extends BaseState, TPayload = undefined, TResult = void> = (payload: TPayload, mutator: (mutate: Mutator<TState, undefined, void>) => void, controller: AbortController, onAbort: (callback: TaskAbortCallback) => void) => Promise<TResult>;
export type Action<TPayload, TResult = void> = undefined extends TPayload ? (payload?: TPayload, controller?: AbortController) => Task<TResult> : (payload: TPayload, controller?: AbortController) => Task<TResult>;
export type ActionPredicate<TPayload = unknown> = (payload?: TPayload) => boolean;
export type ActionHookHandler<TPayload, TResult> = (data: ActionEventData<TPayload, TResult>) => void;

export interface ActionTaskState {
    runCount: number;
    instances: Map<symbol, unknown>;
    errors: Map<symbol, unknown>;
}

export interface ActionStoreState {
    '$harlem:actions': Record<string, ActionTaskState>;
}

export interface ActionOptions {
    parallel: boolean;
    autoClearErrors: boolean;
}

export interface ActionEventData<TPayload = any, TResult = any> {
    action: string;
    payload: TPayload;
    result?: TResult;
}