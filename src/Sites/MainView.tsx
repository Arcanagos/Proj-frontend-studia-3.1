import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import * as Scripts from './ApiCalls';
import './MainView.css';

interface ViewParams {
    userId: string;
    [key: string]: string | undefined;
}

const MainView = () => {
    const { userId } = useParams<ViewParams>();
    const [allAlbums, setAllAlbums] = useState<Scripts.Album[]>([]);
    const [filteredAlbums, setFilteredAlbums] = useState<Scripts.Album[]>(allAlbums);
    const [selectedAlbum, setSelectedAlbum] = useState<Scripts.Album | null>(null);
    const [expandedPhoto, setExpandedPhoto] = useState<Scripts.Photo | null>(null);
    const [filterId, setFilterId] = useState<string>("");
    let navigate = useNavigate();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        const fetchData = async () => {
            const albums = await Scripts.getModifiableAlbumes(userId);
            setAllAlbums(albums);
        };

        fetchData();
    }, [userId]);

    useEffect(() => {
        if (filterId.trim() != "") {
            const filtered = allAlbums.filter(album => album.userId.toString() == filterId);
            setFilteredAlbums(filtered);
        } else {
            setFilteredAlbums(allAlbums);
        }
    }, [filterId, allAlbums]);

    const handleAlbumClick = (album: Scripts.Album) => {
        setSelectedAlbum(album);
        setExpandedPhoto(null);

        const zdjTitleElem = document.getElementById("ZdjTitleDiv");

        if (zdjTitleElem) {
            zdjTitleElem.style.visibility = "visible";
        }

        scrollToTop();
    };

    const handleShowAddingClick = () => {

        const showAdding = document.getElementById("ShowAdding");
        const addPhotoDiv = document.getElementById("AddPhotoDiv");
        

        if (addPhotoDiv) {
            addPhotoDiv.style.visibility = "visible";
        }
        if (showAdding) {
            showAdding.style.visibility = "hidden";
        }
    };

    const handlePhotoClick = (photo: Scripts.Photo) => {
        setExpandedPhoto(photo);
    };

    const handleCloseClick = () => {
        setExpandedPhoto(null);
    };

    const handleDeleteClick = async () => {
        if (expandedPhoto && expandedPhoto.canEdit && selectedAlbum && selectedAlbum.photos) {

            const response = await Scripts.DeletePicture(expandedPhoto.id.toString());

            if (response == true) {
                const updatedPhotos = selectedAlbum.photos.filter(photo => photo.id != expandedPhoto.id);
                selectedAlbum.photos = updatedPhotos;
                setExpandedPhoto(null);
            }
            else {
                alert("Nie udało się usunąć zdjęcia");
            }
        }
    };

    const handleAddPhotoClick = async () => {
        const addPhotoTitleInput = document.getElementById("AddPhotoTitleInput") as HTMLInputElement;
        const fileInput = document.getElementById("FileInput") as HTMLInputElement;

        const title = addPhotoTitleInput.value.trim();

        if (title == "") {
            alert("Nadaj tytuł zdjęciu");
            return;
        }

        if (selectedAlbum) {
            if (fileInput.files && fileInput.files.length > 0) {
                const file = fileInput.files[0];
                const filePath = URL.createObjectURL(file);

                let result = await Scripts.addPhoto(title, filePath, selectedAlbum.id.toString() , userId);

                if (result == true) {
                    alert("Plik wysłany pomyślnie");
                    addPhotoTitleInput.value = "";
                    fileInput.value = "";
                }
                else {
                    alert("Problem z wysłaniem pliku");
                }
            } else {
                alert("Wybierz plik");
            }
        }
    };

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
                    <li id="ActivElem">Strona główna</li>
                    <li onClick={goToProfile}>Profil</li>
                    <li onClick={goToPosts}>Posty</li>
                    <li onClick={goToSearch}>Wyszukaj</li>
                </ul>
            </div>
            <div id="Content">
                <div id="ZdjTitleDiv">
                    <h1>Zdjęcia</h1>
                    <button id="ShowAdding" onClick={handleShowAddingClick}>Dodaj zdjęcie</button>
                    <div id="AddPhotoDiv">
                        <input id="AddPhotoTitleInput" placeholder="Wprowadź tytuł"></input>
                        <input id="FileInput" type="file"></input>
                        <button id="AddPhotoButton" onClick={handleAddPhotoClick}>Dodaj zdjęcie</button>
                    </div>
                </div>
                <div id="Photos">
                    {selectedAlbum && selectedAlbum.photos && selectedAlbum.photos.map((photo) => (
                        <div key={photo.id} className="photoContainer" onClick={() => handlePhotoClick(photo)}>
                            <img src={photo.thumbnailUrl} alt={photo.title} className="photoThumbnail" />
                            <p className="photoTitle">{photo.title}</p>
                        </div>
                    ))}
                </div>
                {expandedPhoto && (
                    <div className="expPhotoContainer" onClick={handleCloseClick}>
                        <div className="expPhotoContent">
                            <img src={expandedPhoto.url} alt="" className="expPhoto" />
                            <h1 className="photoExpTitle">{expandedPhoto.title}</h1>

                            {expandedPhoto.canEdit && (
                                <button className="delPhotoButton" onClick={handleDeleteClick}>Usuń zdjęcie</button>
                            )}

                        </div>
                    </div>
                )}

                <h1>Albumy</h1>

                <div id="Filtrowanie">
                    <input type="text" placeholder="Wprowadź ID" value={filterId} onChange={(e) => setFilterId(e.target.value)} />
                </div>

                <div id="Albumes">
                    {filteredAlbums.map((album) => (
                        <div key={album.id} className="albumContainer" onClick={() => handleAlbumClick(album)}>
                            <h2 className="albumTitle">{album.title}</h2>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MainView;
