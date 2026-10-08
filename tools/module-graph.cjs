// Fingerprint only compiled MDX modules reachable from each maintained source.
const fs=require('fs'),path=require('path'),crypto=require('crypto'),root=path.resolve(__dirname,'..'),directory=path.join(root,'.cache/mdx'),memo=new Map();
const hash=value=>crypto.createHash('sha256').update(value).digest('hex');
function signature(file,visiting=new Set()){if(memo.has(file))return memo.get(file);const code=fs.readFileSync(file,'utf8');if(visiting.has(file))return hash(code);const next=new Set(visiting).add(file),imports=[];for(const match of code.matchAll(/(?:from\s+|import\s*)['"]([^'"]+\.(?:md|mdx)\.jsx)['"]/g)){const target=path.resolve(path.dirname(file),match[1]);if(target.startsWith(directory+path.sep)&&fs.existsSync(target))imports.push([path.relative(directory,target),signature(target,next)]);}const result=hash(JSON.stringify([code,imports]));memo.set(file,result);return result;}
exports.signature=source=>signature(path.join(directory,source+'.jsx'));
