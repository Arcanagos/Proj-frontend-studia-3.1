export async function getAllPhotos() {
    const response = await fetch("https://jsonplaceholder.typicode.com/photos");
    const data = await response.json();

    return data;
}

export async function getAllUsers() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users/");
    const data = await response.json();

    return data;
}

export interface Photo {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
    canEdit?: boolean;
}

export interface Album {
    userId: number;
    id: number;
    title: string;
    canEdit?: boolean;
    photos?: Photo[];
}

export async function getModifiableAlbumes(senderId: string | undefined) {
    const albumsResponse = await fetch("https://jsonplaceholder.typicode.com/albums");
    const albumsData = await albumsResponse.json();

    const photosData = await getAllPhotos();

    const photosByAlbumId: Record<number, Photo[]> = {};

    photosData.forEach((photo: Photo) => {
        if (!photosByAlbumId[photo.albumId]) {
            photosByAlbumId[photo.albumId] = [];
        }
        photosByAlbumId[photo.albumId].push(photo);
    });

    const albumsWithPhotos = albumsData.map((album: Album) => {
        const albumPhotos = photosByAlbumId[album.id];
        const canEdit = album.userId == parseInt(senderId || "", 10);
        const photosWithCanEdit = albumPhotos.map((photo: Photo) => ({
            albumId: photo.albumId,
            id: photo.id,
            title: photo.title,
            url: photo.url,
            thumbnailUrl: photo.thumbnailUrl,
            canEdit,
        }));

        return {
            userId: album.userId,
            id: album.id,
            title: album.title,
            canEdit,
            photos: photosWithCanEdit,
        };
    });

    return albumsWithPhotos;
}

export function addPhoto(title: string, filePath: string, albumId: string, senderId: string | undefined) {
    return fetch('https://jsonplaceholder.typicode.com/photos', {
        method: 'POST',
        body: JSON.stringify({
            title: title,
            body: filePath,
            userId: senderId,
            albumId: albumId,
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
    })
    .then((response) => {
        if (response.ok) {
           return true;
        }
        return false;
    });
}

export interface UserData {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    };
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
}

export async function getUserData(senderId: string | undefined) {
    const response = await fetch("https://jsonplaceholder.typicode.com/users/" + senderId);
    const data = await response.json();

    return data;
}

export function putUserData(senderId: string | undefined, updatedData: UserData) {
    return fetch("https://jsonplaceholder.typicode.com/users/" + senderId, {
        method: "PUT",
        body: JSON.stringify({
            id: senderId,
            name: updatedData.name,
            username: updatedData.username,
            email: updatedData.email,
            address: {
                street: updatedData.address.street,
                suite: updatedData.address.suite,
                city: updatedData.address.city,
                zipcode: updatedData.address.zipcode,
                geo: {
                    lat: updatedData.address.geo.lat,
                    lng: updatedData.address.geo.lng,
                },
            },
            phone: updatedData.phone,
            website: updatedData.website,
            company: {
                name: updatedData.company.name,
                catchPhrase: updatedData.company.catchPhrase,
                bs: updatedData.company.bs,
            },
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => {
            if (response.ok) {
                return true;
            }
            return false;
        })
}

export async function getUserPhotos(senderId: string | undefined) {
    const userAlbums = await getModifiableAlbumes(senderId);
    const allPhotos: Photo[] = [];

    userAlbums.forEach((album: { photos: any[]; }) => {
        if (album.photos) {
            album.photos.forEach((photo: Photo) => {
                if (photo.canEdit) {
                    allPhotos.push(photo);
                }
            });
        }
    });

    return allPhotos;
}

export async function getUserAlbumes(senderId: string | undefined) {
    const response = await fetch("https://jsonplaceholder.typicode.com/users/" + senderId + "/albums" );
    const data = await response.json();

    return data;
}

export async function findUserByName(name: string) {
    const users = await getAllUsers();
    const foundUser = users.find((user: UserData) => user.name.includes(name));

    return foundUser;
}

export async function findPhotoById(id: string) {
    const response = await fetch("https://jsonplaceholder.typicode.com/photos/" + id);
    const data = await response.json();

    return data;
}

export async function findAlbumById(id: string) {
    const response = await fetch("https://jsonplaceholder.typicode.com/albums/" + id);
    const data = await response.json();

    return data;
}

export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
    comments?: Comment[];
    canEdit?: boolean;
}

export interface Comment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
};

export async function getUserPosts(senderId: string | undefined) {
    const response = await fetch("https://jsonplaceholder.typicode.com/users/" + senderId + "/posts");
    const data = await response.json();

    return data;
}

export async function getAllPosts() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/");
    const data = await response.json();

    return data;
}

export async function getAllComments() {
    const response = await fetch("https://jsonplaceholder.typicode.com/comments/");
    const data = await response.json();

    return data;
}

export async function getPostsAndComments(senderId: string | undefined) {

    const posts = await getAllPosts();
    const comments = await getAllComments();
    const mergedPosts = posts.map((post: Post) => {
        const canEdit = post.userId == parseInt(senderId || "", 10);
        const postComments = comments.filter((comment: Comment) => comment.postId == post.id);
        return {
            userId: post.userId,
            id: post.id,
            title: post.title,
            body: post.body,
            comments: postComments,
            canEdit: canEdit
        };
    });

    return mergedPosts;        
}

export async function DeletePicture(id: string) {
    return fetch('https://jsonplaceholder.typicode.com/Photos/' + id, {
        method: 'DELETE',
    })
    .then((response) => {
        if (response.ok) {
            return true;
        }
        return false;
    });
}

export async function DeletePost(id: string) {
    return fetch('https://jsonplaceholder.typicode.com/Posts/' + id, {
        method: 'DELETE',
    })
        .then((response) => {
            if (response.ok) {
                return true;
            }
            return false;
        });
}
