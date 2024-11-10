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
export interface History {
  'sender' : Iden,
  'amount' : number,
  'receiver' : Iden,
}
export type Iden = string;
export interface _SERVICE {
  'createAccount' : ActorMethod<
    [string, string, string, string, number],
    Array<Iden>
  >,
  'dumpHistory' : ActorMethod<[], Array<History>>,
  'dumpIden' : ActorMethod<[], Array<Iden>>,
  'getBalance' : ActorMethod<[string], number>,
  'getData' : ActorMethod<[Iden], AccountData>,
  'getHistory' : ActorMethod<[Iden], Array<History>>,
  'hashPassword' : ActorMethod<[string], string>,
  'transfer' : ActorMethod<[Iden, Iden, number], Array<AccountData>>,
  'validateLogin' : ActorMethod<[string, string], boolean>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
