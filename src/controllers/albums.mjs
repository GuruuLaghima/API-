import AlbumModel from '../models/album.mjs';

const Albums = class Albums {
  constructor(app, connect) {
    this.app = app;
    this.AlbumModel = connect.model('Album', AlbumModel);

    this.run();
  }

  
  create() {
    this.app.post('/albums', (req, res) => {
      try {
        const albumModel = new this.AlbumModel(req.body);
        albumModel.save().then((album) => {
          res.status(200).json(album || {});
        }).catch(() => {
          res.status(500).json({ message: 'Internal Server error' });
        });
      } catch (err) {
        console.error(`[ERROR] albums/create -> ${err}`);
        res.status(400).json({ code: 400, message: 'Bad request' });
      }
    });
  }

  
  list() {
    this.app.get('/albums', (req, res) => {
      try {
        this.AlbumModel.find().then((albums) => {
          res.status(200).json(albums || []);
        }).catch(() => {
          res.status(500).json({ message: 'Internal Server error' });
        });
      } catch (err) {
        console.error(`[ERROR] albums/list -> ${err}`);
        res.status(400).json({ code: 400, message: 'Bad request' });
      }
    });
  }

  
  showById() {
    this.app.get('/albums/:id', async (req, res) => {
      try {
        
        const album = await this.AlbumModel.findById(req.params.id).populate('photos');
        if (!album) {
          return res.status(404).json({ message: 'Album not found' });
        }
        return res.status(200).json(album);
      } catch (err) {
        console.error(`[ERROR] albums/:id -> ${err}`);
        return res.status(500).json({ message: 'Internal Server error' });
      }
    });
  }

  
  updateById() {
    this.app.put('/albums/:id', (req, res) => {
      try {
        this.AlbumModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).then((album) => {
          res.status(200).json(album || {});
        }).catch(() => {
          res.status(500).json({ message: 'Internal Server error' });
        });
      } catch (err) {
        console.error(`[ERROR] albums/update/:id -> ${err}`);
        res.status(400).json({ code: 400, message: 'Bad request' });
      }
    });
  }

  
  deleteById() {
    this.app.delete('/albums/:id', (req, res) => {
      try {
        this.AlbumModel.findByIdAndDelete(req.params.id).then((album) => {
          res.status(200).json(album || {});
        }).catch(() => {
          res.status(500).json({ message: 'Internal Server error' });
        });
      } catch (err) {
        console.error(`[ERROR] albums/delete/:id -> ${err}`);
        res.status(400).json({ code: 400, message: 'Bad request' });
      }
    });
  }

  
  run() {
    this.create();
    this.list();
    this.showById();
    this.updateById();
    this.deleteById();
  }
};

export default Albums;
