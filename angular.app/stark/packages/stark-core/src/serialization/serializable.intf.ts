import { IEnum, INewable, ISerializable } from "cerialize";

// alias for all serializable types to be used with the serialization library
export type StarkSerializable = ISerializable | IEnum | INewable<any>;
