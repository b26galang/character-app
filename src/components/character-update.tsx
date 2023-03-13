import { NavBar } from "./navbar";
import { Character, CharacterDetailsUpdate, CharacterIdentifier, getCharacterByIdentifier, updateCharacterDetails } from "../api/character-requests";
import { CharacterReducer, initialState } from "../reducer/character-reducer";
import { FormEvent, useReducer, useState } from "react";

export function CharacterUpdate() {

    const [characterId, setCharacterId] = useState(0);
    const [characterUpdateState, dispatch] = useReducer(CharacterReducer, initialState);
    const [character, setCharacter] = useState<Character | null>(null);

    async function submitData(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        let character: CharacterDetailsUpdate = {
            id: Number(characterUpdateState.id),
            name: characterUpdateState.name,
            job: characterUpdateState.job,
            weapon: characterUpdateState.weapon,
            favorite: characterUpdateState.favorite,
        }
        updateCharacterDetails(character);
    }

    const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setCharacter(null);
        setCharacterId(Number(event.target.value));
        const userInput: CharacterIdentifier = { idToSearch: Number(event.target.value) };
        const result = await getCharacterByIdentifier(userInput);
        setCharacter(result);
    }

    return <>
        <NavBar />
        <div className="pageContainer">
            <form onSubmit={(e: FormEvent<HTMLFormElement>) => submitData(e)}>
                <h2>Edit a Character</h2>
                <label htmlFor="idInput">Character ID to Update:</label>
                <input
                    id="idInput"
                    type="number"
                    placeholder="1"
                    value={characterUpdateState.id}
                    onChange={e => {
                        dispatch({ type: "SET_ID", payload: Number(e.target.value) });
                        handleInputChange(e);
                    }}
                />
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
                        <button type='submit'>Update</button>
                    </li>
                </ul>
                {character && (
                    <ul>
                        <li key={character.id}> {character.favorite && <img src={require('.././styles/star.png')} alt="star" style={{ height: '13px' }} />} ID: {character.id}
                        </li>
                        <li key={character.id}>Name: {character.name}</li>
                        <li key={character.id}>Job: {character.job}</li>
                        <li key={character.id}>Weapon: {character.weapon}</li>
                    </ul>
                )}
            </form>
        </div>
    </>

}