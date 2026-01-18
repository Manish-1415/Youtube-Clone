import ApiError from "../../utility/ApiError";
import { Playlist } from "./playlist.model";

const playlistService = {
    createPlaylistEntry : async (userId , playlistInfoObj) => {
        // simply create playlist
        playlistInfoObj.ownerUserId = userId;
        const createNewEntry = await Playlist.create(playlistInfoObj)

        if(!createNewEntry) throw new ApiError(500 , "Error Occurred whiel creating an Playlist");

        return createNewEntry;
    },

    updatePlaylistEntry : async (userId , playlistId , videoId) => {
        // find the playlist first 
        let findPlaylist = await Playlist.findById(playlistId);

        if(!findPlaylist) throw new ApiError(404 , "Playlist Not Found To Update");

        // if playlist is there then simply check if playlist already have an video or not
        
        const findIfVidExist = findPlaylist.videos.find( (entry) => entry.toString() === playlistId.toString());

        if(findIfVidExist !== undefined) return { message : "Video Already Available inside this Playlist" }

        if(findPlaylist.ownerUserId.toString() !== userId.toString()) throw new ApiError(400 , "User is not Authorized to perform this Operation");
        
        findPlaylist.videos.push(videoId);

        await findPlaylist.save();

        return findPlaylist
    },

    deleteVidEntryFromPlaylist : async (userId , playlistId , videoId) => {
        // find the playlist First
        let findPlaylist = await Playlist.findById(playlistId);

        if(!findPlaylist) throw new ApiError(404 , "Playlist Not Found ");

        // if playlist is there then find the vid in that playlist first 

        const vidFromPlaylist = findPlaylist.videos.find( (entry) => entry.toString() === videoId );

        if(vidFromPlaylist === undefined) throw new ApiError(400 , "Video is not present in playlist");

        // ownership check
        if(findPlaylist.ownerUserId.toString() !== userId) throw new ApiError(400 , "User is Not Authorized to perform this Operation");

        // now filter the data
        findPlaylist.videos.filter( (entry) => entry.toString() !== videoId.toString())

        await findPlaylist.save();

        return findPlaylist;
    },

    deletePlaylistEntry : async (userId , playlistId) => {
        // find playlist
        const findPlaylist = await Playlist.findById(playlistId);

        if(!findPlaylist) throw new ApiError(404 , "Playlist Not Found , Please Provide Valid Playlist Id")
        
        // checkOwnership
        if(findPlaylist.ownerUserId.toString() !== userId.toString()) throw new ApiError(400 , "User is not authorized to perform this Operation");

        // now delete the playlist
        const deletePlaylist = await Playlist.findByIdAndDelete(playlistId);

        if(!deletePlaylist) throw new ApiError(500 , "Error Occurred while deleting Playlist");

        return deletePlaylist;
    },
    
    getPlaylistVideosEntry : async (playlistId) => {
        // find playlist
        const findPlaylist = await Playlist.findById(playlistId);
        
        if(!findPlaylist) throw new ApiError(404 , "Playlist Not Found");

        return findPlaylist;
    },

    getAllPlaylistOfUser : async (userId) => {
        // find if user have playlist or not
        const findUserPlaylist = await Playlist.find({ownerUserId : userId});

        if(findUserPlaylist.length === 0) return { message : "User Dont Have Playlist" } 

        return findUserPlaylist;
    }
}


export default playlistService;