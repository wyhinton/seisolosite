import { action, Action, ActionOn, actionOn, thunkOn, ThunkOn, thunk, Thunk } from "easy-peasy";
import { StoreModel } from "./index";

export interface LogModel{
  //state
  data: string[]

  //requests
    // onUpdate: ThunkOn<LogModel, never, StoreModel>
  //setter
  setData: Action<LogModel, string[]>

}

const logModel: LogModel= {
    //state
    data: [],
    
    //requests

    //setters
    setData: action((state, data) => {
    state.data = data
    }),
    //listeners
    // onUpdate: thunkOn(
    //     (actions, storeActions) =>
    //         [
	// 		 storeActions.samplesModel.loadSamples,
	// 		 storeActions.samplesModel.setSamples
    //         ],
    //     (actions, target) => {


    //     }
    //   ),
};

export default logModel;







// let log = {
// 	info: function info(message) {
// 		const callerInfo = getFileName(info.caller.name);
// 		console.log(
// 			new Date() +
// 				' ' +
// 				arguments.callee.name.toUpperCase() +
// 				' ' +
// 				callerInfo.filename +
// 				':' +
// 				callerInfo.line +
// 				':' +
// 				callerInfo.column +
// 				' ' +
// 				info.caller.name +
// 				'() ' +
// 				message
// 		);
// 	},
// };

// function getFileName(caller) {
//   const STACK_FUNC_NAME = new RegExp(/at\s+((\S+)\s)?\((\S+):(\d+):(\d+)\)/);
// 	let err = new Error();
// 	Error.captureStackTrace(err);
// 	let stacks = err.stack.split('\n').slice(1);

// 	let callerInfo = null;
// 	for (let i = 0; i < stacks.length; i++) {
// 		callerInfo = STACK_FUNC_NAME.exec(stacks[i]);
    
// 		if (callerInfo[2] === caller) {
// 			return {
// 				filename: callerInfo[3],
// 				line: callerInfo[4],
// 				column: callerInfo[5],
// 			};
// 		}
// 	}

// 	return null;
// }

// function iWantToLog() {
// 	log.info('Testing my log');
// }

// iWantToLog();