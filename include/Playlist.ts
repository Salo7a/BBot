import mongoose, { Model, Schema } from "mongoose";

/** Interface describing the properties a user model has. */
interface PlaylistModel extends Model<any> {
  findPlaylist(Name: string): any;
  findAllPlaylists(): any;
  FindOrCreate(Name: any, Songs: any): any;
}

/** Interface describing the properties a user document has. */
interface PlaylistDoc extends Document {
  Name: string,
  Songs?: string,
  SongsNames?: string,
  SongsDuration?: string
}

const playlistSchema = new Schema({
  Name: {
    type: String,
    required: [true, "Playlist Name is required"]
  },
  Songs: {
    type: Array,
    required: [true, "Songs Array is required"]
  },
  SongsNames: {
    type: Array,
    required: [true, "Songs Names Array is required"]
  },
  SongsDuration: {
    type: Array,
    required: [true, "Songs Names Array is required"]
  }
});

playlistSchema.statics.findPlaylist = async function (Name: any) {
  return this.findOne({ Name });
}

playlistSchema.statics.findAllPlaylists = async function () {
  return this.find();
}

playlistSchema.statics.FindOrCreate = async function (Name: any, Songs: any) {
  let playlist = await this.findOne({ Name });
  if (!playlist) {
    // @ts-ignore
    return new Playlist({
      Name,
      Songs
    }).save();
  }
}

export const Playlist = mongoose.model<PlaylistDoc,PlaylistModel>("Playlist", playlistSchema, "Playlist",  { overwriteModels: true});