function mapLayout(rows) {
  const newRows = {
    memberId: null,
    folders: [],
  };

  newRows.memberId = rows[0].UserId;

  rows.forEach(row => {
    if (!Array.isArray(row)) {
      const { FolderId, FolderName, FolderOrder, PageTitle, PageId, PageOrder } = row;

      // if the folder isn't already in the array, create the entry
      if (!newRows.folders[FolderOrder]) {
        newRows.folders.push({
          folderId: FolderId,
          folderName: FolderName,
          pages: [],
        });
      }
      // push the page
      newRows.folders[FolderOrder].pages.push({
        title: PageTitle,
        id: PageId,
        order: PageOrder,
      });
    }
  });
  return newRows;
}

async function getLayout(req, res) {
  let conn;

  // if(!req.params.memberid) return res.
  try {
    conn = await req.app.locals.pool.getConnection();
    const query = `select f.id as FolderId, f.name as FolderName, f.member_id as UserId, f.folder_order as FolderOrder, p.title as PageTitle, p.page_order as PageOrder, p.ID as PageId from folders f left join pages p on p.folder_id = f.id where p.member_id = ${req.params.memberid} order by FolderOrder, PageOrder`;
    const rows = await conn.query(query, []);

    res.json(mapLayout(rows));
  } catch (err) {
    throw new Error(err);
  } finally {
    if (conn) {
      conn.release();
    }
  }
}
exports.getLayout = getLayout;
