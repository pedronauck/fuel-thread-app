/* Autogenerated file. Do not edit manually. */

/* tslint:disable */
/* eslint-disable */

/*
  Fuels version: 0.65.0
  Forc version: 0.46.1
  Fuel-Core version: 0.20.8
*/

import type {
  BigNumberish,
  BN,
  BytesLike,
  Contract,
  DecodedValue,
  FunctionFragment,
  Interface,
  InvokeFunction,
} from 'fuels';

import type { Vec } from "./common";

export type AddressInput = { value: string };
export type AddressOutput = AddressInput;
export type RawBytesInput = { ptr: BigNumberish, cap: BigNumberish };
export type RawBytesOutput = { ptr: BN, cap: BN };

interface ThreadContractAbiInterface extends Interface {
  functions: {
    get_ids: FunctionFragment;
    get_msg: FunctionFragment;
    get_sender: FunctionFragment;
    insert_msg: FunctionFragment;
  };

  encodeFunctionData(functionFragment: 'get_ids', values: []): Uint8Array;
  encodeFunctionData(functionFragment: 'get_msg', values: [string]): Uint8Array;
  encodeFunctionData(functionFragment: 'get_sender', values: [string]): Uint8Array;
  encodeFunctionData(functionFragment: 'insert_msg', values: [string, StdString]): Uint8Array;

  decodeFunctionData(functionFragment: 'get_ids', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'get_msg', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'get_sender', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'insert_msg', data: BytesLike): DecodedValue;
}

export class ThreadContractAbi extends Contract {
  interface: ThreadContractAbiInterface;
  functions: {
    get_ids: InvokeFunction<[], Vec<string>>;
    get_msg: InvokeFunction<[id: string], StdString>;
    get_sender: InvokeFunction<[id: string], AddressOutput>;
    insert_msg: InvokeFunction<[id: string, msg: StdString], string>;
  };
}
