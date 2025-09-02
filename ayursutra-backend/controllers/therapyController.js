const Therapy = require('../models/Therapy');

// @desc    Get all therapies
// @route   GET /api/therapies
// @access  Private
exports.getTherapies = async (req, res) => {
  try {
    const therapies = await Therapy.find().sort({ date: -1 });
    res.json(therapies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Add a therapy
// @route   POST /api/therapies
// @access  Private
exports.addTherapy = async (req, res) => {
  const { name, description, duration, price, category } = req.body;

  try {
    const newTherapy = new Therapy({
      name,
      description,
      duration,
      price,
      category,
    });

    const therapy = await newTherapy.save();

    res.json(therapy);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Update a therapy
// @route   PUT /api/therapies/:id
// @access  Private
exports.updateTherapy = async (req, res) => {
  const { name, description, duration, price, category } = req.body;

  // Build therapy object
  const therapyFields = {};
  if (name) therapyFields.name = name;
  if (description) therapyFields.description = description;
  if (duration) therapyFields.duration = duration;
  if (price) therapyFields.price = price;
  if (category) therapyFields.category = category;

  try {
    let therapy = await Therapy.findById(req.params.id);

    if (!therapy) return res.status(404).json({ msg: 'Therapy not found' });

    therapy = await Therapy.findByIdAndUpdate(
      req.params.id,
      { $set: therapyFields },
      { new: true }
    );

    res.json(therapy);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Delete a therapy
// @route   DELETE /api/therapies/:id
// @access  Private
exports.deleteTherapy = async (req, res) => {
  try {
    let therapy = await Therapy.findById(req.params.id);

    if (!therapy) return res.status(404).json({ msg: 'Therapy not found' });

    await Therapy.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Therapy removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};