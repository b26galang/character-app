import { useState } from "react";
import { Character, CharacterIdentifier, deleteCharacter, getCharacterByIdentifier } from "../api/character-requests";
import { NavBar } from "./navbar";

export function CharacterDelete() {
    const [characterId, setCharacterId] = useState(0);
    const [character, setCharacter] = useState<Character | null>(null);

    const handleDelete = () => {
        deleteCharacter(characterId);
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
            <h2>Delete a Character by ID</h2>
            <input type="number" placeholder="ex: 1" value={characterId} onChange={handleInputChange} />
            <br />
            <button onClick={handleDelete}>Delete</button>
            {character != null &&
                <ul>
                    <li key={character.id}> {character.favorite && <img src={require('.././styles/star.png')} alt="star" style={{ height: '13px' }} />} ID: {character.id}
                    </li>
                    <li key={character.id}>Name: {character.name}</li>
                    <li key={character.id}>Job: {character.job}</li>
                    <li key={character.id}>Weapon: {character.weapon}</li>
                </ul>
            }
        </div>
    </>

}