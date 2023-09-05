import {Component, Inject, OnInit} from '@angular/core';
import { AssetEntryDto, AssetService} from "../../../mgmt-api-client";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {StorageType} from "../../models/storage-type";


@Component({
  selector: 'edc-demo-asset-editor-dialog',
  templateUrl: './asset-editor-dialog.component.html',
  styleUrls: ['./asset-editor-dialog.component.scss']
})
export class AssetEditorDialog implements OnInit {

  id: string = '';
  version: string = '';
  name: string = '';
  contenttype: string = '';

  storageTypeId: string = 'AzureStorage';
  account: string = '';
  container: string = 'src-container';
  blobname: string = '';

  constructor(private assetService: AssetService, private dialogRef: MatDialogRef<AssetEditorDialog>,
      @Inject('STORAGE_TYPES') public storageTypes: StorageType[]) {
  }

  ngOnInit(): void {
  }

  onSave() {
    const assetEntryDto: AssetEntryDto = {
      "@context": {
        "edc": "https://w3id.org/edc/v0.0.1/ns/"
      },
      "@type": "edc:Asset",
      "@id": this.id,
      "edc:properties": {
          "edc:id": this.id,
          "edc:name": this.name,
          "edc:contenttype": this.contenttype || "text/plain",
          "edc:version": this.version || "1.0",
          "edc:type": "AzureStorage"
      },
      "edc:dataAddress": {
          "@type": "edc:DataAddress",
          "edc:type": "AzureStorage",
          "edc:properties": [
              {
              "edc:account": this.account,
              "edc:container": "src-container",
              "edc:blobname": "text-document.txt",
              "edc:keyName": "3-key1"
              }
          ]
      }
  };

    this.dialogRef.close({ assetEntryDto });
  }
}
