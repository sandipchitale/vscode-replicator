import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

let extensionPath = '.';
let replicatorExecutable = 'replicator';
let env: NodeJS.ProcessEnv;

export function activate(context: vscode.ExtensionContext) {
	const platform = process.platform;
	const arc = process.arch;

	extensionPath = context.extensionPath;

	replicatorExecutable = path.join(extensionPath, 'release', platform, arc, 'bin', replicatorExecutable);
	context.subscriptions.push(vscode.commands.registerCommand('vscode-replicator.repl', repl));

	env = process.env;
	env['PATH'] = `${path.join(extensionPath, 'release', platform, arc, 'bin')}${path.delimiter}${env['PATH']}`;
}

async function repl() {
	const commandsToWrap = vscode.workspace.getConfiguration('vscode-replicator').get<string[]>('commandsToWrap');
	if (!commandsToWrap || commandsToWrap.length === 0) {
		vscode.window.showErrorMessage('No commands to wrap');
		return;
	}
	const commandToWrap = await vscode.window.showQuickPick(commandsToWrap, {
		placeHolder: 'Select a command to wrap'
	});
	if (commandToWrap && commandToWrap.trim().length > 0) {
		let iconPath;
		if (fs.existsSync(path.join(extensionPath, 'images', `${commandToWrap}.png`))) {
			iconPath = vscode.Uri.file(path.join(extensionPath, 'images', `${commandToWrap}.png`));
		} else {
			iconPath = vscode.Uri.file(path.join(extensionPath, 'images', 'icon.png'));
		}
		const terminal = vscode.window.createTerminal({
			name: `${commandToWrap} REPL`,
			iconPath,
			env: env,
			location: {
				viewColumn: vscode.ViewColumn.Active,
				preserveFocus: false
			},
			isTransient: true,
		});
		terminal.sendText(`${replicatorExecutable} ${commandToWrap}\n`);
		terminal.show();
	}
}

export function deactivate() {}
