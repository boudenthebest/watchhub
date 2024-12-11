const jwt = require('jsonwebtoken');

const users = [
    { id: 1, username: 'user1', password: 'password1' }
];

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        const token = jwt.sign({ userId: user.id }, 'secret-key');
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});