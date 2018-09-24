export const GET_ALBUMS = 'brainence-test-progect/albums/LOAD';
export const GET_ALBUMS_SUCCESS = 'brainence-test-progect/albums/LOAD_SUCCESS';
export const GET_ALBUMS_FAIL = 'brainence-test-progect/albums/LOAD_FAIL';

export const GET_ALBUM_PHOTOS = 'brainence-test-progect/albums/PHOTOS';
export const GET_ALBUM_PHOTOS_SUCCESS = 'brainence-test-progect/albums/PHOTOS_SUCCESS';
export const GET_ALBUM_PHOTOS_FAIL = 'brainence-test-progect/albums/PHOTOS_FAIL';

export const GET_USER = 'brainence-test-progect/user/USER';
export const GET_USER_SUCCESS = 'brainence-test-progect/user/USER_SUCCESS';
export const GET_USER_FAIL = 'brainence-test-progect/user/USER_FAIL';
export const LOG_OUT ='brainence-test-progect/user/LOG_OUT';


export const UPDATE_USER_ID_INPUT = 'UPDATE_USER_ID_INPUT';

const initialState = { albums: [], filledAlbums: [], user: {}, userIdInput: '' };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALBUMS:
      return { ...state, loading: true, filledAlbums: [] };
    case GET_ALBUMS_SUCCESS:
      return { ...state, loading: false, albums: action.payload.data };
    case GET_ALBUMS_FAIL:
      return { ...state, loading: false, error: 'Error getting Albums info' };
    case GET_ALBUM_PHOTOS:
      return { ...state, loadingInfo: true };
    case GET_ALBUM_PHOTOS_SUCCESS:
    // console.log(action)
      let filledAlbum = {...action.meta.previousAction.meta, 
        photos : action.payload.data, 
        titlePhotoIndex: Math.floor((Math.random() * action.payload.data.length))}
      return { 
        ...state, 
        loadingInfo: false, 
        filledAlbums: [...state.filledAlbums, filledAlbum]
      };
      return {...state}
    case GET_ALBUM_PHOTOS_FAIL:
      console.log(action);
      return {
        ...state,
        loadingInfo: false,
        errorInfo: 'Error getting repo info'
      };
    case GET_USER:
      return { ...state, loadingProfile: true };
    case GET_USER_SUCCESS:  {
      return { ...state, loadingProfile: false, user: action.payload.data };
    }
    case GET_USER_FAIL:
      return {
        ...state,
        loadingProfile: false,
        errorUser: 'Error getting user info'
      };
    case LOG_OUT:
    return {
      ...state,
      albums: [],
      filledAlbums: [], 
      user: {}, 
      userIdInput: ''
    }
    case UPDATE_USER_ID_INPUT: 
      return {
        ...state,
        userIdInput: action.payload,
        user: {}
      }
    default:
      return state;
  }
}

export function listAlbums(userId) {
  return {
    type: GET_ALBUMS,
    payload: {
      request: {
        url: `/albums?userId=${userId}`
      }
    }
  };
}
export function getRepoDetail(user, repo) {
  return {
    type: GET_REPO_INFO,
    payload: {
      request: {
        url: `/repos/${user}/${repo}`
      }
    }
  };
}

export function getUser(userId) {
  return {
    type: GET_USER,
    payload: {
      request: {
        url: `/users/${userId}`
      }
    }
  };
}

export function listPhotos(album) {
  return {
    type: GET_ALBUM_PHOTOS,
    payload: {
      request: {
        url: `/photos?albumId=${album.id}`
      }      
    },
    meta: album
  };
}

export function updateUserIdInput(input) {
  return {
    type: UPDATE_USER_ID_INPUT,
    payload: input
  };
}
export function logOut () {
  this.props.navigation.navigate('Profile')
  return {
    type: LOG_OUT
  };
}