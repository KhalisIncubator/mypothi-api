function mapPage(rows) {
  const newRows = {};
  console.log(rows.length);
  rows.forEach(row => {
    if (!newRows.title && !newRows.body) {
      newRows.title = row.PageTitle;
      newRows.body = row.PageBody;
    }
  });

  return newRows;
}
async function getPage(req, res) {
  let conn;

  // if(!req.params.memberid) return res.
  try {
    conn = await req.app.locals.pool.getConnection();
    const { memberid, pageid } = req.params;
    const query = `select p.title as PageTitle, p.Body as PageBody from pages p where p.member_id = ${memberid} and p.ID = ${pageid}`;
    const rows = mapPage(await conn.query(query, []));

    res.json(rows);
  } catch (err) {
    throw new Error(err);
  } finally {
    if (conn) {
      conn.release();
    }
  }
}

exports.getPage = getPage;

async function createPage(req, res) {
  const { title, body, memberid, folderid = null, order } = req.body;
  let conn;

  // if(!req.params.memberid) return res.
  try {
    conn = await req.app.locals.pool.getConnection();
    const query = `INSERT INTO pages (member_id, page_order, Title, Body, folder_id) VALUES (${memberid}, ${order}, ${title}, ${body}, ${folderid})`;
    conn.query(query, []).then(res.json);
  } catch (err) {
    throw new Error(err);
  } finally {
    if (conn) {
      conn.release();
    }
  }
}
exports.createPage = createPage;
async function updatePage(req, res) {
  let conn;

  // if(!req.params.memberid) return res.
  try {
    conn = await req.app.locals.pool.getConnection();
    const { memberid, pageid } = req.params;
    const query = `select p.title as PageTitle, p.Body as PageBody from pages p where p.member_id = ${memberid} and p.ID = ${pageid}`;
    const rows = mapPage(await conn.query(query, []));

    res.json(rows);
  } catch (err) {
    throw new Error(err);
  } finally {
    if (conn) {
      conn.release();
    }
  }
}
exports.updatePage = updatePage;
async function deletePage(req, res) {
  let conn;

  // if(!req.params.memberid) return res.
  try {
    conn = await req.app.locals.pool.getConnection();
    const { memberid, pageid } = req.params;
    const query = `select p.title as PageTitle, p.Body as PageBody from pages p where p.member_id = ${memberid} and p.ID = ${pageid}`;
    const rows = mapPage(await conn.query(query, []));

    res.json(rows);
  } catch (err) {
    throw new Error(err);
  } finally {
    if (conn) {
      conn.release();
    }
  }
}
exports.deletePage = deletePage;
