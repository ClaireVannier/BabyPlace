const tables = require("../tables");

const get = async (req, res) => {
  try {
    const booking = await tables.booking.read(req.params.id);

    if (booking == null) {
      res.sendStatus(404);
    } else {
      res.json(booking);
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

    res.status(201).json({ message: "Réservation créée.", id: insertId});
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
  get,
  post,
  put,
  deleteBooking,
};
