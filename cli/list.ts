import { Command } from 'commander';
import { glob } from 'glob';
import prompts from 'prompts';
import { startTest } from './scripts/test-runner.ts';
import { sep } from 'path';

const program = new Command();

program
  .name('list')
  .description('Uruchamianie zadań z wybranego modułu')
  .argument('[course]', 'Nazwa modułu', 'core-pro')
  .option('-w, --watch', 'Uruchamia testy w trybie obserwatora', false)
  .action(async (course: string, options: { watch: boolean }) => {
    try {
      const coursePath = `tasks/${course}/*`;
      const folders = await glob(coursePath, { mark: false, nodir: false });

      if (folders.length === 0) {
        console.error(`👉 Nie znaleziono modułu o nazwie "${course}"`);
        process.exit(1);
      }

      const taskNames = folders.map((folder) => folder.split(sep).pop()) as string[];
      const choices = taskNames
        .map((task) => ({ title: task, value: task }))
        .sort((a, b) => a.title.localeCompare(b.title));

      const { task } = await prompts({
        type: 'select',
        name: 'task',
        message: '🔍 Wybierz zadanie do weryfikacji:',
        choices,
      });

      if (!task) {
        console.error('👉 Nie wybrano zadania do weryfikacji');
        process.exit(1);
      }

      await startTest(`tasks/${course}/${task}`, { watch: options.watch });
    } catch (error) {
      console.error(`\n❌ Nieoczekiwany błąd :(\n\n ${error}`);
      process.exit(1);
    }
  });

program.parse();
