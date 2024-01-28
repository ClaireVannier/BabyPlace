const tables = require("../tables");

const getByChildrenId = async (req, res) => {
  try {
    const { childrenId } = req.params;
    const bookingList = await tables.booking.readByChildrenId(childrenId);

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    bookingList.forEach(booking => {
      booking.start_date = new Date(booking.start_date).toLocaleDateString('fr-FR', options);
      booking.end_date = new Date(booking.end_date).toLocaleDateString('fr-FR', options);
    })

    if (bookingList == null) {
      res.sendStatus(404);
    } else {
      res.json(bookingList);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500).json({ sucess: false, message: err.message });
  }
};
const getByNurseryId = async (req, res) => {
  try {
    const { nurseryId } = req.params;
    const bookingList = await tables.booking.readByNurseryId(nurseryId);

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    bookingList.forEach(booking => {
      booking.children_is_walking = !!booking.children_is_walking;
      booking.start_date = new Date(booking.start_date).toLocaleDateString('fr-FR', options);
      booking.end_date = new Date(booking.end_date).toLocaleDateString('fr-FR', options);
    })


    if (bookingList == null) {
      res.sendStatus(404);
    } else {
      res.json(bookingList);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500).json({ sucess: false, message: err.message });
  }
};

const post = async (req, res) => {
  const booking = req.body;

  try {
    const insertId = await tables.booking.create(booking);

    res.status(201).json({ message: "Réservation créée.", id: insertId });
  } catch (err) {
    console.error(err);
    res.status(500).error(err.message);
  }
};

const checkAvailability = async (req, res) => {
  const { nurseryId } = req.params;
  const datesToCheck = req.body;

  try {
    const count = await tables.booking.checkAvailability(nurseryId, datesToCheck);
    res.status(200).json({ ...count });
  } catch (err) {
    console.error(err);
    res.status(500).error(err.message);
  }
};

const put = async (req, res) => {
  const booking = req.body;
  const bookingId = req.params.id;

  try {
    const affectedRows = await tables.booking.update(booking, bookingId);

    if (affectedRows > 0) {
      res.status(200).json({ success: true, message: "Mise à jour réussie." });
    } else {
      res.status(404).json({
        success: false,
        message: "Aucune résérvation trouvée pour la mise à jour.",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteBooking = async (req, res) => {
  const bookingId = req.params.id;

  try {
    const affectedRows = await tables.booking.delete(bookingId);

    if (affectedRows > 0) {
      res.status(200).json({ success: true, message: "Suppression réussie." });
    } else {
      res.status(404).json({
        success: false,
        message: "Aucune résérvation trouvée pour la suppression.",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getByChildrenId,
  getByNurseryId,
  checkAvailability,
  post,
  put,
  deleteBooking,
};
