const { Router } = require('express');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    req.app.get('db').execute({
      sqlText: 'SELECT * FROM ARCHIVE_REGISTER',
      complete: (err, stmt, rows) => {
        if (err) {
          return next(err);
        }
        return res.status(200).json({ stmt, rows });
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post('/', (req, res, next) => {
  const { EquipmentName, StartedAt, EndedAt, Status, Comments } = req.body;
  try {
    req.app.get('db').execute({
      sqlText: `INSERT INTO ARCHIVE_REGISTER VALUES 
                  (
                    :1,
                    :2,
                    :3,
                    :4,
                    :5,
                    (SELECT MAX("Id") FROM ARCHIVE_REGISTER) + 1
                  )  
                `,
      binds: [EquipmentName, StartedAt, EndedAt, Status, Comments],
      complete: (err, stmt, rows) => {
        if (err) {
          return next(err);
        }
        return res.status(200).json({ stmt, rows });
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:EquipmentName', (req, res, next) => {
  const { EquipmentName } = req.params;
  try {
    req.app.get('db').execute({
      sqlText: 'SELECT * FROM ARCHIVE_REGISTER WHERE "EquipmentName" = :1',
      binds: [EquipmentName],
      complete: (err, stmt, rows) => {
        if (err) {
          return next(err);
        }
        return res.status(200).json({ stmt, rows });
      },
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  const { StartedAt, EndedAt, Status, Comments } = req.body;
  try {
    req.app.get('db').execute({
      sqlText:
        'UPDATE ARCHIVE_REGISTER SET "StartedAt" = :2,"EndedAt" = :3, "Status" = :4, "Comments" = :5 WHERE "Id" = :1',
      binds: [id, StartedAt, EndedAt, Status, Comments],
      complete: (err, stmt, rows) => {
        if (err) {
          return next(err);
        }
        return res.status(200).json({ stmt, rows });
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  try {
    req.app.get('db').execute({
      sqlText: 'DELETE FROM ARCHIVE_REGISTER WHERE "Id" = :1',
      binds: [id],
      complete: (err, stmt, rows) => {
        if (err) {
          return next(err);
        }
        return res.status(200).json({ stmt, rows });
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
