const advancedResults = (model, populate) => async (req, res, next) => {
  let query;

  // Create a copy of req.query as to not mutate original
  const reqQuery = { ...req.query };

  // Remove fields from reqQuery
  const removeFields = ['select', 'sort'];
  removeFields.forEach((field) => delete reqQuery[field]);

  let queryStr = JSON.stringify(reqQuery);

  // Match these query operators in reqQuery and add a "$" in front
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  // Base query (not yet run), defaults to find all if there is no query
  query = model.find(JSON.parse(queryStr));

  // If there is select query, chain it to the base query
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // If there is a sort query, chain it to the base query
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    // If no sort query, chain one on by default
    query = query.sort({ createdAt: 'desc', new: 'desc' });
  }

  // If any fields in a doc are being populated, chain this query
  if (populate) {
    query = query.populate(populate);
  }

  // Execute the final query
  const results = await query;

  // Add results into the res object and pass down to the controller
  res.advancedResults = {
    success: true,
    count: results.length,
    data: results,
  };

  next();
};

export default advancedResults;
