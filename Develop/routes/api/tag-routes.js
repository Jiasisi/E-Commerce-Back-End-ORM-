const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagsData = await Tag.findAll({
      include: [
        {
          model: Product,
          attributes: [
            "id",
            'product_name',
            'price',
            'stock',
            'category_id'
          ],
          through: ProductTag,
          as: 'tagIds'
        }
      ],
    });
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async(req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagsData = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: [
            "id",
            'product_name',
            'price',
            'stock',
            'category_id'
          ],
          through: ProductTag,
          as: 'tagIds'
        }
      ],
    });
    if (!tagsData) {
      res.status(404).json({message: "No tag found with that id"});
      return;
    }
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async(req, res) => {
  // create a new tag
  try {
    const tagsData = await Tag.create(req.body);
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async(req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagsData = await Tag.update(req.body, {
      where: {
        id: req.params.id,

      }
    });
    if (tagsData[0] === 0) {
      res.status(404).json({message: "No tag found with that id"});
      return;
    }
    res.json(tagsData);
  } catch (err) {
    res.status(500).json({"message": "Something went wrong"});
  }
});

router.delete('/:id', async(req, res) => {
  // delete on tag by its `id` value
  const tagsData = await Tag.destroy({
    where: {
      id: req.params.id,
    }
  });
  return res.json(tagsData);
});

module.exports = router;
