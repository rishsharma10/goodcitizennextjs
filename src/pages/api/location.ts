export default async function handler(req:any, res:any) {
    try {
      // const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${req.query.latitude}&lon=${req.query.longitude}`;
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${req.query.latitude},${req.query.longitude}&key=${`AIzaSyBioMK31w2-759jRzfev6Tpkdj9pe2eKrw`}`;
      const data = await fetch(url)
      const result =await data.json()
      res.setHeader('Content-Type', 'application/json');
      res.send({data:result});
    } catch (error) {
      console.error('Error fetching video:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }