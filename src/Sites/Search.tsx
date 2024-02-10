import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import * as Scripts from './ApiCalls';
import './Search.css';

interface ViewParams {
    userId: string;
    [key: string]: string | undefined;
}

const MainView = () => {
    const [user, setUser] = useState<Scripts.UserData>();
    const [photo, setPhoto] = useState<Scripts.Photo>();
    const [album, setAlbum] = useState<Scripts.Album>();
    const { userId } = useParams<ViewParams>();
    let navigate = useNavigate();

    const handleFindUserByName = async () => {
        const userInput = (document.getElementById("findUserInput") as HTMLInputElement)?.value;
        const user = await Scripts.findUserByName(userInput);

        setUser(user);
    }

    const handleFindPhotoById = async () => {
        const photoInput = (document.getElementById("findPhotoInput") as HTMLInputElement)?.value;
        const photo = await Scripts.findPhotoById(photoInput);

        setPhoto(photo);
    }

    const handleFindAlbumById = async () => {
        const albumInput = (document.getElementById("findAlbumInput") as HTMLInputElement)?.value;
        const album = await Scripts.findAlbumById(albumInput);

        setAlbum(album);
    }

    const goToMainView = () => {
        navigate("/MainView/" + userId);
    }

    const goToProfile = () => {
        navigate("/Profile/" + userId);
    }
    const goToPosts = () => {
        navigate("/Posts/" + userId);
    }
    const goToSearch = () => {
        navigate("/Search/" + userId);
    }

    return (
        <div id="MainViewContainer">
            <div id="Menu">
                <p id="Gelerianka">Galerianka</p>
                <ul>
                    <li onClick={goToMainView}>Strona główna</li>
                    <li onClick={goToProfile}>Profil</li>
                    <li onClick={goToPosts}>Posty</li>
                    <li id="ActivElem">Wyszukaj</li>
                </ul>
            </div>
            <div id="SearchDiv">
                <div>
                    <div id="FindUserDiv">
                        <input type="text" placeholder="Wpisz imie lub nazwisko użytkownika" id="findUserInput"/>
                        <button onClick={handleFindUserByName}>Szukaj</button>

                        {user && (
                            <div id="FoundUserDiv">
                                <h3>Znaleziony użytkownik:</h3>
                                <p>Imie i nazwisko: {user.name}</p>
                                <p>Nazwa Użytkownika: {user.username}</p>
                                <p>Mail: {user.email}</p>
                                <p>Miasto: {user.address.city}</p>
                                <p>Strona Internetowa: {user.website}</p>
                            </div>
                        )}

                    </div>
                    <div id="FindPhotoDiv">
                        <input type="text" placeholder="Wpisz id zdjęcia" id="findPhotoInput"/>
                        <button onClick={handleFindPhotoById}>Szukaj</button>

                        {photo && (
                            <div id="FoundUserDiv">
                                <h3>Znaleziony zdjęcie:</h3>
                                <p>ID albumu: {photo.albumId}</p>
                                <p>ID zdjęcia: {photo.id}</p>
                                <p>Tytuł: {photo.title}</p>
                                <p>Thumbnail:</p>
                                <img src={photo.thumbnailUrl} alt="Brak zasobu"></img>
                                <p>Zdjęcie:</p>
                                <img src={photo.url} alt="Brak zasobu"></img>
                            </div>
                        )}
                    </div>
                    <div id="FindAlbumDiv">
                        <input type="text" placeholder="Wpisz id albumu" id="findAlbumInput"/>
                        <button onClick={handleFindAlbumById}>Szukaj</button>

                        {album && (
                            <div id="FoundUserDiv">
                                <h3>Znaleziony Album:</h3>
                                <p>ID albumu: {album.id}</p>
                                <p>ID właściciela: {album.userId}</p>
                                <p>Tytuł: {album.title}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainView;
