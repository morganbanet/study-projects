function advancedResults(model, populate) {
  return async function (req, res, next) {
    let query;

    const reqQuery = { ...req.query };

    // Queries to exclude
    const removeFields = ['select', 'sort', 'page', 'limit'];

    // Loop over removeFields and delete from reqQuery
    removeFields.forEach((field) => delete reqQuery[field]);

    // Create query string
    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt, $lte, etc)
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );

    // Dynamic query (defaults to find all if no queryStr)
    query = model.find(JSON.parse(queryStr));

    // Select fields
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields); // Chain onto prev
    }

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort({ createdAt: 'asc', name: -1 });
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = page > 0 ? (page - 1) * limit : 0;
    const endIndex = page * limit;
    const total = await model.countDocuments(queryStr);

    query = query.skip(startIndex).limit(limit);

    // Check if populating a field
    if (populate) {
      query = query.populate(populate);
    }

    const results = await query;

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    // Advanced results into res
    res.advancedResults = {
      success: true,
      count: results.length,
      pagination,
      data: results,
    };

    next();
  };
}

module.exports = advancedResults;
