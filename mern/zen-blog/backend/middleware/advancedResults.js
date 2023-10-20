const advancedResults = (model) => async (req, res, next) => {
  let query;

  const reqQuery = { ...query };

  // Exclude queries
  const removeFields = ['select', 'sort'];

  // Delete excluded queries from reqQuery
  removeFields.forEach((field) => delete reqQuery[field]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators that need dollar sign ($gt, $lt, etc)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  // Dynamic query
  query = model.find(JSON.parse(queryStr));

  // Select fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields); // Chain onto prev query
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort({ createdAt: 'desc' });
  }

  // Execute query
  const results = await query;

  // Add results into res object, access in controller
  res.advancedResults = {
    success: true,
    count: results.length,
    data: results,
  };

  next();
};

module.exports = advancedResults;
