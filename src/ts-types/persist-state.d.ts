declare module 'persist-state' {
    type PersistStateConfig = {
        key: string,
        persistAcrosSession?: boolean,
        persistOnUnmount?: boolean,
    }

    function usePersistState<T>(initialState: T, config: PersistStateConfig | string): [ state: T, setState: (T) => void ];
}
