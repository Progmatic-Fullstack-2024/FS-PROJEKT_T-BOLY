import statisticsService from "../services/statistics-service.js";

const getStatistics = async (req, res, next) => {
  try {
    const statistics = await statisticsService.getStatistics();
    res.json(statistics);
  } catch (error) {
    next(error);
  }
};

const getAdminStatistics = async (req, res) => {
  try {
    const stats = await statisticsService.getAdminStatistics();
    res.json(stats);
  } catch (error) {
    console.error("Error fetching admin statistics:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export default { getStatistics, getAdminStatistics };
