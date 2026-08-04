const json = (req, res) => {
    const jsonRes = { ...req.query };
    jsonRes['date'] = new Date().toISOString();
    res.json(jsonRes);
}

export default json