const advancedResults = (model) => async (req, res, next) => {
  const reqQuery = { ...req.query };

  const removeFields = ['select', 'sort'];

  // Filter removeFields items from reqQuery object
  removeFields.forEach((field) => delete reqQuery[field]);

  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $lte, etc)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  // Parse queryStr into base query
  let baseQuery = model.find(JSON.parse(queryStr));

  // Select fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    baseQuery = baseQuery.select(fields); // Chain onto base query
  }

  // Sort fields
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    baseQuery = baseQuery.sort(sortBy);
  } else {
    baseQuery = baseQuery.sort({ createdAt: 'desc' });
  }

  const results = await baseQuery;

  // Advanced results
  res.advancedResults = {
    succcess: true,
    count: results.length,
    data: results,
  };

  next();
};

module.exports = advancedResults;
