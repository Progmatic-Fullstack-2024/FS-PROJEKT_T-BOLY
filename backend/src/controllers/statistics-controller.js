import statisticsService from "../services/statistics-service.js";

const getStatistics = async (req, res, next) => {
  try {
    const statistics = await statisticsService.getStatistics();
    res.json(statistics);
  } catch (error) {
    next(error);
  }
};

export default { getStatistics };
