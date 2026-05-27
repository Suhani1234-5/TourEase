const TravelLocker = require("../models/TravelLocker");

// Get all documents for the logged-in user
exports.getDocuments = async (req, res, next) => {
  try {
    const documents = await TravelLocker.find({ createdBy: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, documents });
  } catch (error) {
    next(error);
  }
};

// Add a new document to the locker
exports.addDocument = async (req, res, next) => {
  try {
    const { type, documentNumber, expiryDate, issuingAuthority, notes } = req.body;

    if (!type || !documentNumber) {
      return res.status(400).json({
        success: false,
        message: "Document type and document number are required.",
      });
    }

    const newDoc = new TravelLocker({
      createdBy: req.user.id,
      type,
      documentNumber: documentNumber.trim(),
      expiryDate: expiryDate ? new Date(expiryDate) : undefined,
      issuingAuthority: issuingAuthority?.trim() || undefined,
      notes: notes?.trim() || undefined,
    });

    await newDoc.save();
    res.status(201).json({ success: true, document: newDoc });
  } catch (error) {
    next(error);
  }
};

// Delete a document from the locker
exports.deleteDocument = async (req, res, next) => {
  try {
    const doc = await TravelLocker.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.id,
    });

    if (!doc) {
      return res.status(404).json({
        success: false,
        message: "Document not found or access denied.",
      });
    }

    res.json({ success: true, message: "Document removed from locker." });
  } catch (error) {
    next(error);
  }
};
