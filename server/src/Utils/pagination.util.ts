const pagination = (totalDocuments: number, page: number, limit: number) => {
    const pageSize = Number(limit) || 10;
    const currentPage = Number(page) || 1;
    const skip = (currentPage - 1) * pageSize;
    const totalPages = Math.ceil(totalDocuments / pageSize);
    if (currentPage > totalPages) {
        return { status: 404, path: 'noContent', message: 'There are no content on this page' };
    };
    return { limit: pageSize, skip: skip, totalDocuments: totalDocuments, totalPages: totalPages, currentPage: currentPage };
};



export default pagination;