import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users$: Observable<User[]> = this.userService.getAll();
  phrase: string = '';
  sorterColumn: string = 'id';
  sorterDirection: string = 'ASC';

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
  }

  onDelete(id: number): void {
    if (confirm(`Are you sure you want to delete user with ${id} ID?`)) {
      this.userService.remove(id).subscribe(
        () => this.users$ = this.userService.getAll()
      );
    }
  }

  onChangePhrase(event: Event): void {
    this.phrase = (event.target as HTMLInputElement).value;
  }

  onClickColumn(column: string): void {
    this.sorterColumn = column;
  }

}
