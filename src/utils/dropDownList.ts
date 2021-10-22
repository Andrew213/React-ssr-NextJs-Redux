import share from '@img/icons/Desktop/share.svg';
import hide from '@img/icons/Desktop/hide.svg';
import save from '@img/icons/Desktop/save.svg';
import report from '@img/icons/Desktop/report.svg';
import comments from '@img/icons/comments.svg';
import { ListProps } from '@/lib/List/List';

export const dropDownList: ListProps[] = [
    {
        id: 'Comments',
        text: 'Комментарии',
        liIcon: comments,
        As: 'button',
    },
    {
        id: 'Share',
        text: 'Поделиться',
        liIcon: share,
        As: 'button',
    },
    {
        id: 'Hide',
        text: 'Скрыть',
        liIcon: hide,
        As: 'button',
    },
    {
        id: 'Save',
        text: 'Сохранить',
        liIcon: save,
        As: 'button',
    },
    {
        id: 'Report',
        text: 'Пожаловаться',
        liIcon: report,
        As: 'button',
    },
    {
        id: 'Close',
        text: 'Закрыть',
        As: 'button',
    },
];
