import { FormEvent, useReducer } from "react";
import { createCharacter } from "../api/character-requests";
import { CharacterCreationDetails, CharacterReducer, initialState } from "../reducer/character-reducer";
import { NavBar } from "./navbar";

export type Character = {
    id: number,
    name: string,
    job: string,
    weapon: string,
    favorite: boolean,
}

export function CharacterForm() {

    const [characterState, dispatch] = useReducer(CharacterReducer, initialState);

    async function submitData(event: FormEvent<HTMLFormElement>) {
        let character: CharacterCreationDetails = { name: "", job: "", weapon: "", favorite: false };
        character.name = characterState.name;
        character.job = characterState.job;
        character.weapon = characterState.weapon;
        character.favorite = characterState.favorite;

        createCharacter(character);
    }

    return <>
        <NavBar />
        <div className="pageContainer">
            <form onSubmit={(e: FormEvent<HTMLFormElement>) => submitData(e)}>
                <h2>Create a Character</h2>
                <ul>
                    <li>
                        <label htmlFor="name">Name</label>
                    </li>
                    <li>
                        <input id="name" type="text" placeholder="John" onChange={e => dispatch({ type: "SET_NAME", payload: e.target.value })} required />
                    </li>
                    <li>
                        <label htmlFor="job">Job</label>
                    </li>
                    <li>
                        <input id="job" type="text" placeholder="Thief" onChange={e => dispatch({ type: "SET_JOB", payload: e.target.value })} required />
                    </li>
                    <li>
                        <label htmlFor="weapon">Weapon</label>
                    </li>
                    <li>
                        <input id="weapon" type="text" placeholder="dagger" onChange={e => dispatch({ type: "SET_WEAPON", payload: e.target.value })} required />
                    </li>
                    <li>
                        <label htmlFor="favorite">Favorite</label>
                        <input id="favorite" type="checkbox" onChange={e => dispatch({ type: "SET_FAVORITE", payload: e.target.checked })} />
                    </li>
                    <li>
                        <button type='submit'>Create Character</button>
                    </li>
                </ul>

            </form>

        </div>
    </>

}