import pool from "../config/mysql.js";

// 取得所有房型價格 (含房間數)
export const getRoomBasePrices = async () => {
  try {
    const [rows] = await pool.execute(`
      SELECT rbp.id, rbp.hotel_id, rbp.room_type_id, rbp.base_price, rbp.total_rooms, rbp.currency
      FROM room_base_price rbp
      WHERE rbp.is_deleted = 0
    `);
    return rows;
  } catch (error) {
    throw new Error("無法獲取房型價格：" + error.message);
  }
};

// 取得特定飯店價格範圍 (包含最低、最高價)
export const getHotelPriceRange = async (hotelId) => {
  try {
    const [rows] = await pool.execute(
      `SELECT MIN(base_price) AS min_price, MAX(base_price) AS max_price
       FROM room_base_price 
       WHERE hotel_id = ? AND is_deleted = 0`,
      [hotelId]
    );
    return rows[0]; // 回傳單一物件
  } catch (error) {
    throw new Error("無法獲取飯店價格範圍：" + error.message);
  }
};

// 取得所有飯店的價格範圍
export const getGlobalPriceRange = async () => {
  try {
    const [rows] = await pool.execute(
      `SELECT MIN(base_price) AS min_price, MAX(base_price) AS max_price 
       FROM room_base_price WHERE is_deleted = 0`
    );
    return rows[0]; // 回傳單一物件
  } catch (error) {
    throw new Error("無法獲取所有飯店的價格範圍：" + error.message);
  }
};

// 新增房型價格 (含房間總數)
export const addRoomBasePrice = async (hotelId, roomTypeId, basePrice, totalRooms, currency = "TWD") => {
  try {
    const [result] = await pool.execute(
      `INSERT INTO room_base_price (hotel_id, room_type_id, base_price, total_rooms, currency) 
       VALUES (?, ?, ?, ?, ?)`,
      [hotelId, roomTypeId, basePrice, totalRooms, currency]
    );
    return result.insertId; // 回傳新增的 ID
  } catch (error) {
    throw new Error("無法新增房型價格：" + error.message);
  }
};

// 更新房型價格 (含房間總數)
export const updateRoomBasePrice = async (id, basePrice, totalRooms) => {
  try {
    const [result] = await pool.execute(
      `UPDATE room_base_price 
       SET base_price = ?, total_rooms = ?, updated_at = CURRENT_TIMESTAMP 
       WHERE id = ? AND is_deleted = 0`,
      [basePrice, totalRooms, id]
    );
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error("無法更新房型價格：" + error.message);
  }
};

// 軟刪除房型價格
export const softDeleteRoomBasePrice = async (id) => {
  try {
    const [result] = await pool.execute(
      `UPDATE room_base_price 
       SET is_deleted = 1, updated_at = CURRENT_TIMESTAMP 
       WHERE id = ?`,
      [id]
    );
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error("無法刪除房型價格：" + error.message);
  }
};
