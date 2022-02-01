// hack to remove image error in parcel typescript
declare module "*.png"

// allow a global window variable to be accessed from anywhere
// declare var __INITIAL_DATA__: string

/*
declare module "*.png" {
    const value: any;
    export = value;
}
*/