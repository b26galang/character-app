
export type Character = {
    id: number,
    name: string,
    job: string,
    weapon: string,
    favorite: boolean,
}

export type CharacterCreationDetails = {
    name: string,
    job: string,
    weapon: string,
    favorite: boolean,
}

export type CharacterState = {
    name: string,
    job: string,
    weapon: string,
    favorite: boolean,
    characters: Character[],
    id: number
}

export type SetCharacterName = { type: "SET_NAME", payload: string };
export type SetCharacterJob = { type: "SET_JOB", payload: string };
export type SetCharacterWeapon = { type: "SET_WEAPON", payload: string };
export type SetCharacterFavorite = { type: "SET_FAVORITE", payload: boolean };
export type AddCharacter = { type: "ADD_CHARACTER", payload: Character };
export type SetCharacterID = { type: "SET_ID", payload: number};

export type CharacterAction = SetCharacterName | SetCharacterJob | SetCharacterWeapon | SetCharacterFavorite | AddCharacter | SetCharacterID;

export const initialState: CharacterState = {
    name: "",
    job: "",
    weapon: "",
    favorite: false,
    characters: [],
    id: 0
}


export function CharacterReducer(state: CharacterState = initialState, action: CharacterAction): CharacterState {
    const nextState: CharacterState = JSON.parse(JSON.stringify(state));

    switch (action.type) {
        case "SET_NAME": {
            nextState.name = action.payload;
            return nextState;
        }
        case "SET_JOB": {
            nextState.job = action.payload;
            return nextState;
        }
        case "SET_WEAPON": {
            nextState.weapon = action.payload;
            return nextState;
        }
        case "SET_FAVORITE": {
            nextState.favorite = action.payload;
            return nextState;
        }
        case "ADD_CHARACTER": {
            nextState.characters.push(action.payload);
            return nextState;
        }
        case "SET_ID": {
            nextState.id = action.payload;
            return nextState;
        }
    }

}