import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface AccountData {
  'firstname' : string,
  'balance' : number,
  'password' : string,
  'isSuspended' : boolean,
  'lastname' : string,
}
export type Iden = string;
export interface _SERVICE {
  'createAccount' : ActorMethod<[string, string, string, string], Array<Iden>>,
  'getAccount' : ActorMethod<[string], AccountData>,
  'getAllData' : ActorMethod<[], Array<AccountData>>,
  'getAllIden' : ActorMethod<[], Array<Iden>>,
  'hashPassword' : ActorMethod<[string], string>,
  'replaceNullNat' : ActorMethod<[[] | [bigint], bigint], bigint>,
  'validateLogin' : ActorMethod<[string, string], boolean>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
