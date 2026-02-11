const axios = require('axios');

const PISTON_API = 'https://emkc.org/api/v2/piston';

// Language configuration with Piston runtime names and versions
const LANGUAGES = {
  'c': { language: 'c', version: '10.2.0', name: 'C', monacoId: 'c' },
  'cpp': { language: 'c++', version: '10.2.0', name: 'C++', monacoId: 'cpp' },
  'java': { language: 'java', version: '15.0.2', name: 'Java', monacoId: 'java' },
  'python': { language: 'python', version: '3.10.0', name: 'Python', monacoId: 'python' },
  'javascript': { language: 'javascript', version: '18.15.0', name: 'JavaScript', monacoId: 'javascript' },
  'typescript': { language: 'typescript', version: '5.0.3', name: 'TypeScript', monacoId: 'typescript' },
  'csharp': { language: 'csharp.net', version: '5.0.201', name: 'C#', monacoId: 'csharp' },
  'php': { language: 'php', version: '8.2.3', name: 'PHP', monacoId: 'php' },
  'ruby': { language: 'ruby', version: '3.0.1', name: 'Ruby', monacoId: 'ruby' },
  'go': { language: 'go', version: '1.16.2', name: 'Go', monacoId: 'go' },
  'rust': { language: 'rust', version: '1.68.2', name: 'Rust', monacoId: 'rust' },
  'sql': { language: 'sqlite3', version: '3.36.0', name: 'SQL', monacoId: 'sql' },
  'bash': { language: 'bash', version: '5.2.0', name: 'Bash', monacoId: 'shell' },
  'swift': { language: 'swift', version: '5.3.3', name: 'Swift', monacoId: 'swift' },
  'kotlin': { language: 'kotlin', version: '1.8.20', name: 'Kotlin', monacoId: 'kotlin' },
};

// @desc    Get supported languages
// @route   GET /api/code/languages
// @access  Public
exports.getLanguages = async (req, res, next) => {
  try {
    const languages = Object.entries(LANGUAGES).map(([key, val]) => ({
      id: key,
      name: val.name,
      monacoId: val.monacoId
    }));

    res.status(200).json({
      success: true,
      data: languages
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Execute code
// @route   POST /api/code/execute
// @access  Public
exports.executeCode = async (req, res, next) => {
  try {
    const { language, code, input } = req.body;

    if (!language || !code) {
      return res.status(400).json({
        success: false,
        message: 'Language and code are required'
      });
    }

    const langConfig = LANGUAGES[language];
    if (!langConfig) {
      return res.status(400).json({
        success: false,
        message: `Unsupported language: ${language}. Supported: ${Object.keys(LANGUAGES).join(', ')}`
      });
    }

    // Call Piston API
    const response = await axios.post(`${PISTON_API}/execute`, {
      language: langConfig.language,
      version: langConfig.version,
      files: [{ content: code }],
      stdin: input || '',
      run_timeout: 10000, // 10 second timeout
      compile_timeout: 10000
    }, {
      timeout: 30000 // 30 second axios timeout
    });

    const result = response.data;

    res.status(200).json({
      success: true,
      data: {
        language: langConfig.name,
        version: result.version || langConfig.version,
        output: result.run?.output || '',
        stderr: result.run?.stderr || '',
        exitCode: result.run?.code ?? 0,
        compileOutput: result.compile?.output || '',
        compileError: result.compile?.stderr || '',
      }
    });
  } catch (err) {
    // Handle Piston API errors
    if (err.response) {
      return res.status(502).json({
        success: false,
        message: 'Code execution service error. Please try again.',
        error: err.response.data?.message || 'External service error'
      });
    }
    if (err.code === 'ECONNABORTED') {
      return res.status(408).json({
        success: false,
        message: 'Code execution timed out. Please check your code for infinite loops.'
      });
    }
    next(err);
  }
};
