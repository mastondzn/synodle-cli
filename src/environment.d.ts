declare namespace NodeJS {
    interface ProcessEnv {
        readonly NODE_ENV?: 'development' | 'production';
        readonly EXAMPLE_VAR?: 'EXAMPLE_VALUE';
    }
}
