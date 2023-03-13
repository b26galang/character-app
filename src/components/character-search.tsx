import { useState } from "react";
import { Character, CharacterIdentifier, getCharacterByIdentifier } from "../api/character-requests";
import { NavBar } from "./navbar";

export function CharacterSearch() {
    const [identifier, setIdentifier] = useState('');
    const [character, setCharacter] = useState<Character | null>(null);

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIdentifier(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setCharacter(null);

        let userInput: CharacterIdentifier;

        if (!isNaN(Number(identifier))) {
            userInput = { idToSearch: Number(identifier) };
        } else {
            userInput = { nameToSearch: identifier };
        }

        const result = await getCharacterByIdentifier(userInput);
        setCharacter(result);
    };

    return <>
        <NavBar />
        <div className="pageContainer">
        <h2>Search Character by name or ID</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={identifier} onChange={handleInput} required/> <button type="submit">Search</button>
            </form>
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