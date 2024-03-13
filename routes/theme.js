const themeDB = require('../models/themeModel');

// Создание темы
const createTheme = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ status: 'error', msg: 'Request body is empty', innerData: null });
    }

    const newTheme = await themeDB.create(req.body);
    res.status(201).json({
      status: 'success',
      msg: 'Theme is created',
      innerData: newTheme,
    });
  } catch (err) {
    res.status(500).json({ status: 'error', msg: err.message, innerData: null });
  }
};

// Получение одной темы
const getOneTheme = async (req, res) => {
  const { id } = req.params;
  try {
    const foundTheme = await themeDB.findById(id);
    if (!foundTheme) {
      return res.status(404).json({
        status: 'warning',
        msg: 'Theme is not found',
        innerData: null,
      });
    }
    res.status(200).json({
      status: 'success',
      msg: 'Theme is found',
      innerData: foundTheme,
    });
  } catch (err) {
    res.status(500).json({ status: 'error', msg: err.message, innerData: null });
  }
};

// Получение всех тем
const getAllTheme = async (req, res) => {
  try {
    const allThemes = await themeDB.find();
    if (!allThemes.length) {
      return res.status(404).json({
        status: 'warning',
        msg: 'Themes are not found',
        innerData: null,
      });
    }
    res.status(200).json({
      status: 'success',
      msg: 'Themes are found',
      innerData: allThemes,
    });
  } catch (err) {
    res.status(500).json({ status: 'error', msg: err.message, innerData: null });
  }
};

// Получение количества всех тем
const getAllThemeCount = async (req, res) => {
  try {
    const count = await themeDB.countDocuments();
    res.status(200).json({
      status: 'success',
      msg: 'Total count of themes',
      count: count,
    });
  } catch (err) {
    res.status(500).json({ status: 'error', msg: err.message, count: null });
  }
};

// Удаление одной темы
const deleteTheme = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTheme = await themeDB.findByIdAndDelete(id);
    if (!deletedTheme) {
      return res.status(404).json({ msg: 'Theme is not found', innerData: null });
    }
    res.send({ msg: 'Theme is deleted', innerData: deletedTheme });
  } catch (err) {
    res.status(500).json({ status: 'error', msg: err.message, innerData: null });
  }
};

// Удаление всех тем
const deleteAllTheme = async (req, res) => {
  try {
    const { deletedCount } = await themeDB.deleteMany();
    if (deletedCount === 0) {
      return res.status(404).json({ msg: 'No themes found to delete', deletedCount });
    }
    res.status(200).json({ msg: 'All themes are deleted', deletedCount });
  } catch (err) {
    res.status(500).json({ status: 'error', msg: err.message, innerData: null });
  }
};

module.exports = {
  createTheme,
  getAllTheme,
  getOneTheme,
  deleteTheme,
  deleteAllTheme,
  getAllThemeCount,
};
