import PhotoModel from '../models/photo.mjs';
import AlbumModel from '../models/album.mjs';

const Photos = class Photos {
  constructor(app, connect) {
    this.app = app;
    this.PhotoModel = connect.model('Photo', PhotoModel);
    this.AlbumModel = connect.model('Album', AlbumModel);

    this.run();
  }

  
  create() {
    this.app.post('/albums/:albumId/photos', async (req, res) => {
      try {
        const album = await this.AlbumModel.findById(req.params.albumId);
        if (!album) {
          return res.status(404).json({ message: 'Album not found' });
        }

        const photoModel = new this.PhotoModel({
          ...req.body,
          album: req.params.albumId
        });

        const savedPhoto = await photoModel.save();
        album.photos.push(savedPhoto._id);
        await album.save();

        return res.status(200).json(savedPhoto); 
      } catch (err) {
        console.error(`[ERROR] create photo -> ${err}`);
        return res.status(500).json({ message: 'Internal Server error' }); 
      }
    });
  }

  
  listByAlbum() {
    this.app.get('/albums/:albumId/photos', async (req, res) => {
      try {
        const album = await this.AlbumModel.findById(req.params.albumId).populate('photos');
        if (!album) {
          return res.status(404).json({ message: 'Album not found' });
        }
        return res.status(200).json(album.photos); 
      } catch (err) {
        console.error(`[ERROR] list photos -> ${err}`);
        return res.status(500).json({ message: 'Internal Server error' }); 
      }
    });
  }

  
  showById() {
    this.app.get('/albums/:albumId/photos/:photoId', async (req, res) => {
      try {
        const photo = await this.PhotoModel.findById(req.params.photoId).where('album').equals(req.params.albumId);
        if (!photo) {
          return res.status(404).json({ message: 'Photo not found in this album' });
        }
        return res.status(200).json(photo); 
      } catch (err) {
        console.error(`[ERROR] show photo -> ${err}`);
        return res.status(500).json({ message: 'Internal Server error' }); 
      }
    });
  }

  
  updateById() {
    this.app.put('/albums/:albumId/photos/:photoId', async (req, res) => {
      try {
        const photo = await this.PhotoModel.findByIdAndUpdate(req.params.photoId, req.body, { new: true }).where('album').equals(req.params.albumId);
        if (!photo) {
          return res.status(404).json({ message: 'Photo not found in this album' });
        }
        return res.status(200).json(photo); 
      } catch (err) {
        console.error(`[ERROR] update photo -> ${err}`);
        return res.status(500).json({ message: 'Internal Server error' }); 
      }
    });
  }

  
  deleteById() {
    this.app.delete('/albums/:albumId/photos/:photoId', async (req, res) => {
      try {
        const photo = await this.PhotoModel.findByIdAndDelete(req.params.photoId).where('album').equals(req.params.albumId);
        if (!photo) {
          return res.status(404).json({ message: 'Photo not found in this album' });
        }

        const album = await this.AlbumModel.findById(req.params.albumId);
        album.photos.pull(photo._id);
        await album.save();

        return res.status(200).json(photo); 
      } catch (err) {
        console.error(`[ERROR] delete photo -> ${err}`);
        return res.status(500).json({ message: 'Internal Server error' }); 
      }
    });
  }

  
  run() {
    this.create();
    this.listByAlbum();
    this.showById();
    this.updateById();
    this.deleteById();
  }
};

export default Photos;
