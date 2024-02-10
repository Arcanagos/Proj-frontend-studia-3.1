import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import * as Scripts from './ApiCalls';
import './Profile.css';

interface ViewParams {
    userId: string;
    [key: string]: string | undefined;
}

const MainView = () => {
    const { userId } = useParams<ViewParams>();
    const [userData, setUserData] = useState<Scripts.UserData | null>(null);
    const [userPhotos, setUserPhotos] = useState<Scripts.Photo[]>([]);
    const [userAlbums, setUserAlbums] = useState<Scripts.Album[]>([]);
    const [userPosts, setUserPosts] = useState<Scripts.Post[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const data = await Scripts.getUserData(userId);
            setUserData(data);
            const photos = await Scripts.getUserPhotos(userId);
            const albums = await Scripts.getUserAlbumes(userId);
            const posts = await Scripts.getUserPosts(userId);

            setUserPosts(posts);
            setUserPhotos(photos);
            setUserAlbums(albums);
        };

        fetchData();

    }, [userId]);

    useEffect(() => {
        userData && updateValues(userData);

    }, [userData]);

    const sendPutRequest = async () => {
        try {
            const name = (document.getElementById('name') as HTMLInputElement)?.value;
            const username = (document.getElementById('username') as HTMLInputElement)?.value;
            const email = (document.getElementById('email') as HTMLInputElement)?.value;
            const street = (document.getElementById('street') as HTMLInputElement)?.value;
            const suite = (document.getElementById('suite') as HTMLInputElement)?.value;
            const city = (document.getElementById('city') as HTMLInputElement)?.value;
            const zipcode = (document.getElementById('zipcode') as HTMLInputElement)?.value;
            const lat = (document.getElementById('lat') as HTMLInputElement)?.value;
            const lng = (document.getElementById('lng') as HTMLInputElement)?.value;
            const phone = (document.getElementById('phone') as HTMLInputElement)?.value;
            const website = (document.getElementById('website') as HTMLInputElement)?.value;
            const companyName = (document.getElementById('companyName') as HTMLInputElement)?.value;
            const catchPhrase = (document.getElementById('catchPhrase') as HTMLInputElement)?.value;
            const bs = (document.getElementById('bs') as HTMLInputElement)?.value;

            const updatedData: Scripts.UserData = {
                name,
                username,
                email,
                id: parseInt(userId || "", 10),
                address: {
                    street,
                    suite,
                    city,
                    zipcode,
                    geo: {
                        lat,
                        lng
                    }
                },
                phone,
                website,
                company: {
                    name: companyName,
                    catchPhrase,
                    bs
                }
            };

            await Scripts.putUserData(userId, updatedData);
            alert('Dane zmienione');
        } catch (error) {
            alert('Serwer odrzucił zmiany');
        }
    };

    function updateValues(userData: Scripts.UserData | null) {
        const nameElement = document.getElementById('name') as HTMLInputElement | null;
        if (nameElement) {
            nameElement.value = userData?.name || '';
        }

        const usernameElement = document.getElementById('username') as HTMLInputElement | null;
        if (usernameElement) {
            usernameElement.value = userData?.username || '';
        }

        const emailElement = document.getElementById('email') as HTMLInputElement | null;
        if (emailElement) {
            emailElement.value = userData?.email || '';
        }

        const streetElement = document.getElementById('street') as HTMLInputElement | null;
        if (streetElement) {
            streetElement.value = userData?.address?.street || '';
        }

        const suiteElement = document.getElementById('suite') as HTMLInputElement | null;
        if (suiteElement) {
            suiteElement.value = userData?.address?.suite || '';
        }

        const cityElement = document.getElementById('city') as HTMLInputElement | null;
        if (cityElement) {
            cityElement.value = userData?.address?.city || '';
        }

        const zipcodeElement = document.getElementById('zipcode') as HTMLInputElement | null;
        if (zipcodeElement) {
            zipcodeElement.value = userData?.address?.zipcode || '';
        }

        const latElement = document.getElementById('lat') as HTMLInputElement | null;
        if (latElement) {
            latElement.value = userData?.address?.geo?.lat || '';
        }

        const lngElement = document.getElementById('lng') as HTMLInputElement | null;
        if (lngElement) {
            lngElement.value = userData?.address?.geo?.lng || '';
        }

        const phoneElement = document.getElementById('phone') as HTMLInputElement | null;
        if (phoneElement) {
            phoneElement.value = userData?.phone || '';
        }

        const websiteElement = document.getElementById('website') as HTMLInputElement | null;
        if (websiteElement) {
            websiteElement.value = userData?.website || '';
        }

        const companyNameElement = document.getElementById('companyName') as HTMLInputElement | null;
        if (companyNameElement) {
            companyNameElement.value = userData?.company?.name || '';
        }

        const catchPhraseElement = document.getElementById('catchPhrase') as HTMLInputElement | null;
        if (catchPhraseElement) {
            catchPhraseElement.value = userData?.company?.catchPhrase || '';
        }

        const bsElement = document.getElementById('bs') as HTMLInputElement | null;
        if (bsElement) {
            bsElement.value = userData?.company?.bs || '';
        }
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
                    <li id="ActivElem">Profil</li>
                    <li onClick={goToPosts}>Posty</li>
                    <li onClick={goToSearch}>Wyszukaj</li>
                </ul>
            </div>
            <div id="Content">
                <div id="ProfileDiv">
                    <div id="UserInfo">
                        <h1>Dane profilu</h1>

                        <label>Imie i nazwisko:</label>
                        <input type="text" id="name"/>

                        <label>Nazwa użytkownika:</label>
                        <input type="text" id="username"/>

                        <label>Email:</label>
                        <input type="text" id="email"/>

                        <label>Ulica:</label>
                        <input type="text" id="street"/>

                        <label>Mieszkanie:</label>
                        <input type="text" id="suite"/>

                        <label>Miasto:</label>
                        <input type="text" id="city"/>

                        <label>Kod pocztowy:</label>
                        <input type="text" id="zipcode"/>

                        <label>Telefon:</label>
                        <input type="text" id="phone"/>

                        <label>Adres strony:</label>
                        <input type="text" id="website"/>

                        <label>Nazwa firmy:</label>
                        <input type="text" id="companyName"/>

                        <label>Slogan:</label>
                        <input type="text" id="catchPhrase"/>

                        <label>Strategia biznesowa:</label>
                        <input type="text" id="bs"/>

                        <button onClick={sendPutRequest}>Zmień dane</button>
                    </div>
                    <div id="UserStuff">
                        <h1>Twoje Aktywności</h1>

                        <div id="UserPhotos">
                            <h2>Zdjęcia</h2>
                            {userPhotos.map((photo) => (
                                <div key={photo.id} className="photoContainer">
                                    <img src={photo.thumbnailUrl} alt={photo.title} className="photoThumbnail" />
                                    <p className="photoTitle">{photo.title}</p>
                                </div>
                            ))}
                        </div>

                        <div id="UserAlbums">
                            <h2>Albumy</h2>
                            {userAlbums.map((album) => (
                                <div key={album.id} className="albumContainer">
                                    <h2 className="albumTitle">{album.title}</h2>
                                </div>
                            ))}
                        </div>

                        <div id="UserPosts">
                            <h2>Posty</h2>
                            {userAlbums.map((posts) => (
                                <div key={posts.id} className="postContainer">
                                    <h2 className="postTitle">{posts.title}</h2>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainView;
