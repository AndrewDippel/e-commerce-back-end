const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const allCategory = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(allCategory);
  } catch (err) {
    res.status(500).json(err);
  }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  try {
    const singleCategory = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    res.status(200).json(singleCategory);
  } catch (err) {
    res.status(500).json(err);
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(
      req.body
    );
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
  // create a new category
});

router.put('/:id', async (req, res) => {
  try {
    const updateCategory = await Category.update(
      req.body, { where: { id: req.params.id } }
    );
    res.status(200).json(updateCategory);
  } catch (err) {
    res.status(400).json(err);
  }
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    const removeSingleProduct = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!removeSingleProduct) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(removeSingleProduct);
  } catch (err) {
    res.status(500).json(err);
  }
  // delete a category by its `id` value
});

module.exports = router;
