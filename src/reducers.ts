import { Dispatch, Reducer, ReducerState, useReducer } from "react";
import { initialState, PdfAction, PdfDocument } from "./types";

type AsyncDispatch<T> = Dispatch<T | Promise<T>>;

export const wrapAsync = <T>(dispatch: Dispatch<T>): AsyncDispatch<T> => (action: T | Promise<T>) => {
    if (action instanceof Promise) {
        return action.then(dispatch);
    }
    return dispatch(action);
}

export const useAsyncReducer = <R extends Reducer<any, any>>(
    reducer: R,
    initialState: ReducerState<R>,
    initializer?: undefined): [ ReducerState<R>, AsyncDispatch<any> ] => {
    const [ state, dispatch ] = useReducer(reducer, initialState, initializer);

    return [ state, wrapAsync(dispatch) ];
}

export const pdfReducer = (state: PdfDocument, action: PdfAction): PdfDocument => {
    switch (action.type) {
        case "LOAD":
            return {
                name: action.name,
                bytes: action.document,
                pages: action.pages,
                currentPage: action.currentPage,
                metadata: action.metadata,
            };
        case "NEW":
            return initialState;
        case "SET_CURRENT_PAGE":
            return {
                ...state,
                currentPage: action.page,
            };
        case "ROTATE": {
            const page = action.page - 1;
            const array = [ ...state.pages ];
            array[page].angle = (array[page].angle + 180) % 360;
            return {
                ...state,
                pages: array,
            }
        }
        case "MOVE_PAGE_LEFT": {
            const index = action.page - 1
            if (index < 1 || index >= state.pages.length) {
                return state;
            }
            const array = [ ...state.pages ]
            const value = state.pages[index];
            array.splice(index, 1);
            array.splice(index - 1, 0, value);
            return {
                ...state,
                pages: array,
                currentPage: index,
            };
        }
        case "MOVE_PAGE_RIGHT": {
            const index = action.page - 1
            if (index < 0 || index >= state.pages.length - 1) {
                return state;
            }
            const array = [ ...state.pages ];
            const value = state.pages[index];
            array.splice(index, 1);
            array.splice(index + 1, 0, value);
            return {
                ...state,
                pages: array,
                currentPage: index + 2,
            };
        }
        case 'DELETE': {
            const index = action.page - 1
            if (index < 0 || index > state.pages.length - 1) {
                return state;
            }
            const array = [ ...state.pages ];
            array.splice(index, 1);
            array.splice(index + 1, 0);
            return {
                ...state,
                pages: array,
                currentPage: index || 1,
            };
        }
        case "UPDATE_METADATA":
            return {
                ...state,
                metadata: action.metadata,
                name: `${action.metadata.author} - ${action.metadata.title}`,
            };
        default:
            console.log('Unknown command', action);
            return state;
    }
}
